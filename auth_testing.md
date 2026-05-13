# Auth Testing Guide

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.admins.find({role: "admin"}).pretty()
```

## Step 2: API Testing
```bash
API_URL="https://spiritual-path-49.preview.emergentagent.com"

# Login
TOKEN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rudralife.com","password":"Rudralife@2024"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")

# Test admin/me
curl -s "$API_URL/api/auth/me" -H "Authorization: Bearer $TOKEN"

# Submit form
curl -s -X POST "$API_URL/api/form/submit" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"+919999999999","dob":"1990-01-01","gender":"Male","country":"India","state":"Maharashtra","city":"Mumbai","profession":"Professional / Employee","career_stage":"Established","primary_goal":"wealth_prosperity","budget":"₹1,000 - ₹5,000","wearing_preference":"Pendant / Necklace","privacy_agreed":true}'
```

## Credentials
- Admin Email: admin@rudralife.com
- Admin Password: Rudralife@2024
