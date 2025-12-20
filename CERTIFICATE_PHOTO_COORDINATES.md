# Certificate Photo Positioning Reference

## Exact Coordinates for Profile Photo

Use these exact values to position the user's profile photo on the certificate template:

### CSS/Inline Style Properties

```css
position: absolute;
top: 45.1%;
left: 44.2%;
transform: translate(-50%, -50%);
width: 62%;
aspect-ratio: 1;
border-radius: 50%;
overflow: hidden;
border: 4px solid white;
z-index: 10;
```

### React/JSX Implementation

```jsx
<div style={{ 
  position: 'absolute', 
  top: '45.1%', 
  left: '44.2%', 
  transform: 'translate(-50%, -50%)', 
  width: '62%', 
  aspectRatio: '1', 
  borderRadius: '50%', 
  overflow: 'hidden', 
  border: '4px solid white', 
  zIndex: 10 
}}>
  <img 
    src={photoUrl} 
    alt="Profile photo" 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover' 
    }} 
  />
</div>
```

## Explanation of Values

| Property | Value | Purpose |
|----------|-------|---------|
| `position` | `absolute` | Positions photo relative to certificate container |
| `top` | `45.1%` | Vertical center position from top of certificate |
| `left` | `44.2%` | Horizontal center position from left of certificate |
| `transform` | `translate(-50%, -50%)` | Centers the photo precisely on the coordinate point |
| `width` | `62%` | Photo diameter - fills the outer colorful wheel circle |
| `aspect-ratio` | `1` | Maintains perfect circular shape (1:1 ratio) |
| `border-radius` | `50%` | Creates circular mask |
| `overflow` | `hidden` | Clips photo to circular boundary |
| `border` | `4px solid white` | White border around photo |
| `z-index` | `10` | Ensures photo appears above template background |

## Image Inner Styling

The `<img>` tag inside the container should have:

```css
width: 100%;
height: 100%;
object-fit: cover;
```

This ensures the uploaded photo fills the circular frame completely while maintaining its aspect ratio.

## Additional Elements on Certificate

### User Name Positioning

```jsx
<div style={{ 
  position: 'absolute', 
  left: '73%', 
  top: '31%', 
  color: 'white', 
  fontWeight: '900', 
  fontSize: '38px', 
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
  zIndex: 15, 
  width: '28%', 
  overflow: 'hidden', 
  whiteSpace: 'nowrap', 
  textOverflow: 'ellipsis' 
}}>
  {fullName}
</div>
```

### Goal Title Positioning

```jsx
<div style={{ 
  position: 'absolute', 
  left: '78%', 
  top: '82%', 
  color: 'white', 
  fontWeight: 'bold', 
  fontSize: '20px', 
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
  zIndex: 15, 
  width: '18%', 
  textAlign: 'center', 
  lineHeight: '1.2' 
}}>
  {goalTitle}
</div>
```

## Certificate Container Setup

The certificate container should have:

```jsx
<div 
  ref={certificateRef} 
  className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8" 
  style={{ backgroundColor: '#1a365d' }}
>
  <img 
    src="/certificate-template.jpg" 
    alt="Certificate" 
    className="w-full h-full object-cover" 
    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} 
  />
  
  {/* Photo, Name, and Goal elements positioned here */}
</div>
```

## Key Notes

1. **Percentage-based positioning**: All positions use percentages to ensure the layout scales correctly across different screen sizes
2. **Transform centering**: The `translate(-50%, -50%)` ensures the photo is perfectly centered on its x/y coordinates
3. **Aspect ratio**: Container maintains 3:4 aspect ratio (`aspect-[3/4]`) to match certificate template
4. **Max width**: Container max-width is `max-w-2xl` (~672px) for optimal display
5. **Photo fills outer circle**: At 62% width, the photo perfectly matches the outer colorful SDG wheel in the template

## Testing Checklist

- [ ] Photo fills the entire outer circle (colorful SDG wheel)
- [ ] Photo is perfectly centered (no offset left/right/up/down)
- [ ] White border is visible and consistent
- [ ] Name text doesn't overlap with photo
- [ ] Goal title is visible and readable
- [ ] Certificate downloads correctly with all elements in place

---

**Last Updated**: December 2025  
**Tested With**: Certificate template `certificate-template.jpg`
