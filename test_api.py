#!/usr/bin/env python3
"""
Simple test script to verify the KidsChat Playground API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_home_page():
    """Test if the home page loads"""
    try:
        response = requests.get(BASE_URL)
        if response.status_code == 200:
            print("✅ Home page loads successfully")
            return True
        else:
            print(f"❌ Home page failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Home page test failed: {e}")
        return False

def test_chat_endpoint():
    """Test the chat endpoint"""
    try:
        data = {"message": "Hello Robo!"}
        response = requests.post(f"{BASE_URL}/chat", json=data)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Chat endpoint works: {result['response'][:50]}...")
            return True
        else:
            print(f"❌ Chat endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Chat endpoint test failed: {e}")
        return False

def test_riddles_endpoint():
    """Test the riddles endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/riddles")
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Riddles endpoint works: {len(result['riddles'])} riddles loaded")
            return True
        else:
            print(f"❌ Riddles endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Riddles endpoint test failed: {e}")
        return False

def test_animals_endpoint():
    """Test the animals endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/animals")
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Animals endpoint works: {len(result['animals'])} animals loaded")
            return True
        else:
            print(f"❌ Animals endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Animals endpoint test failed: {e}")
        return False

def test_riddle_check():
    """Test riddle checking"""
    try:
        data = {"riddle_id": 0, "answer": "dog"}
        response = requests.post(f"{BASE_URL}/check_riddle", json=data)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Riddle check works: Correct={result['correct']}, Points={result['points']}")
            return True
        else:
            print(f"❌ Riddle check failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Riddle check test failed: {e}")
        return False

def test_animal_check():
    """Test animal checking"""
    try:
        data = {"animal_id": 0, "guess": "elephant"}
        response = requests.post(f"{BASE_URL}/check_animal", json=data)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Animal check works: Correct={result['correct']}, Points={result['points']}")
            return True
        else:
            print(f"❌ Animal check failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Animal check test failed: {e}")
        return False

def run_tests():
    """Run all tests"""
    print("🧪 Testing KidsChat Playground API...")
    print("=" * 50)
    
    tests = [
        ("Home Page", test_home_page),
        ("Chat Endpoint", test_chat_endpoint),
        ("Riddles Endpoint", test_riddles_endpoint),
        ("Animals Endpoint", test_animals_endpoint),
        ("Riddle Check", test_riddle_check),
        ("Animal Check", test_animal_check)
    ]
    
    passed = 0
    failed = 0
    
    for test_name, test_func in tests:
        print(f"\n🔍 Testing {test_name}...")
        if test_func():
            passed += 1
        else:
            failed += 1
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("🎉 All tests passed! The API is working correctly.")
    else:
        print("⚠️  Some tests failed. Please check the server logs.")

if __name__ == "__main__":
    print("Make sure the server is running on http://localhost:8000")
    print("Run: python main.py")
    print()
    run_tests()