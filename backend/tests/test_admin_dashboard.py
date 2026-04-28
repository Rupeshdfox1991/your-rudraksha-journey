"""Admin dashboard API tests: login, submissions, export, filters"""
import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")

@pytest.fixture(scope="module")
def token():
    res = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "admin@rudralife.com",
        "password": "Rudralife@2024"
    })
    assert res.status_code == 200, f"Login failed: {res.text}"
    return res.json()["token"]

@pytest.fixture(scope="module")
def auth(token):
    return {"Authorization": f"Bearer {token}"}

# Admin Login
def test_admin_login_success():
    res = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "admin@rudralife.com",
        "password": "Rudralife@2024"
    })
    assert res.status_code == 200
    data = res.json()
    assert "token" in data
    assert data["email"] == "admin@rudralife.com"

def test_admin_login_wrong_password():
    res = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "admin@rudralife.com",
        "password": "wrongpassword"
    })
    assert res.status_code == 401

# Stats
def test_get_stats(auth):
    res = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth)
    assert res.status_code == 200
    data = res.json()
    assert "total" in data
    assert "pending" in data
    assert "top_goals" in data
    assert data["total"] >= 0

# Submissions pagination
def test_get_submissions(auth):
    res = requests.get(f"{BASE_URL}/api/admin/submissions", headers=auth, params={"page": 1, "limit": 20})
    assert res.status_code == 200
    data = res.json()
    assert "submissions" in data
    assert "total" in data
    assert isinstance(data["submissions"], list)

def test_get_submissions_no_auth():
    res = requests.get(f"{BASE_URL}/api/admin/submissions")
    assert res.status_code == 401

# Date filter
def test_filter_by_date(auth):
    res = requests.get(f"{BASE_URL}/api/admin/submissions", headers=auth, params={
        "from_date": "2024-01-01",
        "to_date": "2026-12-31",
        "page": 1,
        "limit": 20
    })
    assert res.status_code == 200
    data = res.json()
    assert "submissions" in data
    assert "total" in data

# Gender filter
def test_filter_by_gender_male(auth):
    res = requests.get(f"{BASE_URL}/api/admin/submissions", headers=auth, params={"gender": "Male"})
    assert res.status_code == 200
    data = res.json()
    for s in data["submissions"]:
        assert s.get("gender", "").lower() == "male"

# Export (no pagination limit)
def test_export_all_data(auth):
    res = requests.get(f"{BASE_URL}/api/admin/submissions/export", headers=auth)
    assert res.status_code == 200
    data = res.json()
    assert "submissions" in data
    assert "total" in data
    assert isinstance(data["submissions"], list)

def test_export_with_filters(auth):
    res = requests.get(f"{BASE_URL}/api/admin/submissions/export", headers=auth, params={
        "from_date": "2024-01-01",
        "to_date": "2026-12-31",
        "gender": "Male"
    })
    assert res.status_code == 200
    data = res.json()
    for s in data["submissions"]:
        assert s.get("gender", "").lower() == "male"

def test_export_no_auth():
    res = requests.get(f"{BASE_URL}/api/admin/submissions/export")
    assert res.status_code == 401
