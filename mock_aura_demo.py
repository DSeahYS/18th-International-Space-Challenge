import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Rectangle

# Create figure and axis
fig, ax = plt.subplots(figsize=(6, 8))

# Draw head (circle)
head = Circle((0, 0.8), 0.1, color='black', fill=True)
ax.add_patch(head)

# Draw torso (rectangle with blue overlay for low sensitivity)
torso = Rectangle((-0.05, 0.5), 0.1, 0.3, color='blue', alpha=0.5)
ax.add_patch(torso)

# Draw arms (lines with red overlay for high sensitivity)
ax.plot([-0.1, -0.2], [0.7, 0.6], color='red', linewidth=5, alpha=0.7)
ax.plot([0.1, 0.2], [0.7, 0.6], color='red', linewidth=5, alpha=0.7)

# Draw legs (lines)
ax.plot([-0.05, -0.1], [0.5, 0.3], color='black', linewidth=3)
ax.plot([0.05, 0.1], [0.5, 0.3], color='black', linewidth=3)

# Add label
ax.text(0, 1.1, 'AR Overlay for EVA Navigation', ha='center', fontsize=12, fontweight='bold')

# Set limits and remove axes
ax.set_xlim(-0.5, 0.5)
ax.set_ylim(0, 1.2)
ax.axis('off')

# Save the image
plt.savefig('aura_jacobian_mock.png')