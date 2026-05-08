"""Backend API tests for Rudralife Recommendation App"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "admin@rudralife.com"
ADMIN_PASSWORD = "Rudralife@2024"

SAMPLE_FORM = {
    "name": "TEST_User Rudra",
    "email": "test_rudra@example.com",
    "phone": "+919876543210",
    "dob": "1990-05-15",
    "gender": "Male",
    "country": "India",
    "state": "Maharashtra",
    "city": "Mumbai",
    "profession": "Professional / Employee",
    "industry": "Technology",
    "career_stage": "Established",
    "primary_goal": "wealth_prosperity",
    "challenges": "Financial stability",
    "meditation_experience": "Beginner (occasionally)",
    "lifestyle": ["Hectic / Stressful"],
    "budget": "₹5,000 - ₹20,000",
    "wearing_preference": "Pendant / Necklace",
    "notes": "Test submission",
    "privacy_agreed": True
}


class TestHealth:
    """Health check"""

    def test_root_api(self):
        res = requests.get(f"{BASE_URL}/api/")
        assert res.status_code == 200
        assert "Rudralife" in res.json().get("message", "")


class TestAuth:
    """Authentication endpoints"""

    def test_admin_login_success(self):
        res = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert res.status_code == 200
        data = res.json()
        assert "token" in data
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        print("✓ Admin login successful")

    def test_admin_login_invalid_credentials(self):
        res = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert res.status_code == 401
        print("✓ Invalid credentials rejected")

    def test_admin_login_wrong_email(self):
        res = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "wrong@email.com", "password": ADMIN_PASSWORD})
        assert res.status_code == 401

    def test_get_me_with_valid_token(self, auth_token):
        res = requests.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": f"Bearer {auth_token}"})
        assert res.status_code == 200
        data = res.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"

    def test_get_me_without_token(self):
        res = requests.get(f"{BASE_URL}/api/auth/me")
        assert res.status_code == 401


class TestFormSubmit:
    """Form submission endpoints"""
    submission_id = None

    def test_form_submit_success(self):
        res = requests.post(f"{BASE_URL}/api/form/submit", json=SAMPLE_FORM)
        assert res.status_code == 200
        data = res.json()
        assert data["success"] is True
        assert "submission_id" in data
        assert "recommendation" in data
        rec = data["recommendation"]
        assert "primary_mukhi" in rec
        assert "secondary_mukhi" in rec
        assert "life_path" in rec
        TestFormSubmit.submission_id = data["submission_id"]
        print(f"✓ Form submitted, ID: {TestFormSubmit.submission_id}")

    def test_form_result_retrieval(self):
        if not TestFormSubmit.submission_id:
            pytest.skip("No submission ID from previous test")
        res = requests.get(f"{BASE_URL}/api/form/result/{TestFormSubmit.submission_id}")
        assert res.status_code == 200
        data = res.json()
        assert data["name"] == SAMPLE_FORM["name"]
        assert data["email"] == SAMPLE_FORM["email"]
        assert data["primary_goal"] == SAMPLE_FORM["primary_goal"]
        assert "_id" not in data
        print(f"✓ Result retrieved successfully")

    def test_form_result_not_found(self):
        res = requests.get(f"{BASE_URL}/api/form/result/nonexistent-id-12345")
        assert res.status_code == 404

    def test_form_submit_without_privacy_agreed(self):
        payload = {**SAMPLE_FORM, "privacy_agreed": False}
        res = requests.post(f"{BASE_URL}/api/form/submit", json=payload)
        assert res.status_code == 400

    def test_form_submit_missing_required_fields(self):
        res = requests.post(f"{BASE_URL}/api/form/submit", json={"name": "Test"})
        assert res.status_code == 422


class TestAdminRoutes:
    """Admin protected routes"""

    def test_get_submissions_authenticated(self, auth_token):
        res = requests.get(f"{BASE_URL}/api/admin/submissions", headers={"Authorization": f"Bearer {auth_token}"})
        assert res.status_code == 200
        data = res.json()
        assert "submissions" in data
        assert "total" in data
        assert isinstance(data["submissions"], list)
        print(f"✓ Submissions retrieved: {data['total']} total")

    def test_get_stats_authenticated(self, auth_token):
        res = requests.get(f"{BASE_URL}/api/admin/stats", headers={"Authorization": f"Bearer {auth_token}"})
        assert res.status_code == 200
        data = res.json()
        assert "total" in data
        assert "pending" in data
        assert "top_goals" in data
        print(f"✓ Stats retrieved: total={data['total']}, pending={data['pending']}")

    def test_get_submissions_unauthenticated(self):
        res = requests.get(f"{BASE_URL}/api/admin/submissions")
        assert res.status_code == 401

    def test_get_stats_unauthenticated(self):
        res = requests.get(f"{BASE_URL}/api/admin/stats")
        assert res.status_code == 401


@pytest.fixture(scope="session")
def auth_token():
    """Get admin JWT token"""
    res = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if res.status_code == 200:
        return res.json()["token"]
    pytest.skip("Could not authenticate - skipping protected tests")
