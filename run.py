#!/usr/bin/env python3
"""
Simple script to run the KidsChat Playground FastAPI server
"""
import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def run_server():
    """Run the FastAPI server"""
    try:
        print("🚀 Starting KidsChat Playground server...")
        print("🌐 Open your browser and go to: http://localhost:8000")
        print("🛑 Press Ctrl+C to stop the server")
        subprocess.run([sys.executable, "main.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for playing!")
    except Exception as e:
        print(f"❌ Error running server: {e}")

if __name__ == "__main__":
    print("🤖 KidsChat Playground - Python FastAPI Version")
    print("=" * 50)
    
    # Check if requirements are installed
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        sys.exit(1)
    
    # Install requirements
    if install_requirements():
        run_server()
    else:
        print("❌ Failed to install requirements. Please install manually:")
        print("pip install -r requirements.txt")
        sys.exit(1)