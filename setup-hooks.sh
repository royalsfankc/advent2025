#!/bin/bash

# Setup script to install git hooks
# Run this once to set up the pre-push hook

echo "Setting up git hooks..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh

# Pre-push hook to run tests before allowing push to main
# This prevents pushing code that fails tests

# Get the branch being pushed to
while read local_ref local_sha remote_ref remote_sha
do
    if [ "$remote_ref" = "refs/heads/main" ]; then
        echo "🚨 Pushing to main branch detected"
        echo "Running tests before push..."
        
        # Run tests
        npm test
        
        # If tests fail, prevent push
        if [ $? -ne 0 ]; then
            echo "❌ Tests failed! Push blocked."
            echo "Please fix failing tests before pushing to main."
            exit 1
        fi
        
        echo "✅ All tests passed! Proceeding with push..."
    fi
done

exit 0
EOF

# Make it executable
chmod +x .git/hooks/pre-push

echo "✅ Pre-push hook installed successfully!"
echo "Tests will now run automatically before pushing to main."

