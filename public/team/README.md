# Team Member Photos

This directory contains profile photos for team members displayed on the About Us page.

## How to Add Team Member Photos

1. **Prepare your images:**
   - Format: JPG or PNG
   - Size: 500x500px or larger (square aspect ratio works best)
   - File size: Keep under 500KB for optimal performance
   - Name: Use descriptive names (e.g., `sarah-johnson.jpg`, `michael-chen.jpg`)

2. **Add images to this directory:**
   - Place your image files directly in `/public/team/`
   - Example: `/public/team/sarah-johnson.jpg`

3. **Update the team member configuration:**
   - Open `/src/app/about/page.tsx`
   - Find the `teamMembers` array
   - Update the `image` field with your image path
   - Example: Change `"/team/placeholder.jpg"` to `"/team/sarah-johnson.jpg"`

## Example Configuration

```javascript
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Your bio here...",
    image: "/team/sarah-johnson.jpg", // ← Update this path
  },
  // ... more members
];
```

## Fallback Behavior

If you keep `"/team/placeholder.jpg"` or any path containing "placeholder", the system will automatically display the team member's initials in a gradient circle instead of an image.

## Tips

- Use consistent naming: `firstname-lastname.jpg`
- Optimize images before uploading to reduce file size
- Square images work best for the circular profile display
- Consider using professional headshots or outdoor photos that match the AdventureNest brand
