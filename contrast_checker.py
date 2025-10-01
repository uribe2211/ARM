import sys
from colour import Color

def hex_to_color(hex_code):
    try:
        return Color(hex_code)
    except ValueError:
        print(f"Error: Invalid hex color code: {hex_code}. Please use format #RRGGBB or #RGB.")
        sys.exit(1)

def srgb_to_linear(c):
    c = c / 255.0
    if c <= 0.03928:
        return c / 12.92
    else:
        return ((c + 0.055) / 1.055) ** 2.4

def get_luminance(color_obj):
    # color_obj.rgb returns values between 0 and 1. Multiply by 255 for srgb_to_linear.
    r_lin = srgb_to_linear(color_obj.rgb[0] * 255)
    g_lin = srgb_to_linear(color_obj.rgb[1] * 255)
    b_lin = srgb_to_linear(color_obj.rgb[2] * 255)
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python contrast_checker.py <hex_color1> <hex_color2>")
        print("Example: python contrast_checker.py #FFFFFF #000000")
        sys.exit(1)

    color1_hex = sys.argv[1]
    color2_hex = sys.argv[2]

    color1 = hex_to_color(color1_hex)
    color2 = hex_to_color(color2_hex)

    foreground = color1
    background = color2

    L1 = get_luminance(foreground)
    L2 = get_luminance(background)

    # Ensure L1 is the lighter of the two colors for the ratio calculation
    if L1 < L2:
        L1, L2 = L2, L1

    contrast_ratio = (L1 + 0.05) / (L2 + 0.05)

    print(f"Color 1: {color1_hex} (Foreground)")
    print(f"Color 2: {color2_hex} (Background)")
    print(f"Contrast Ratio: {contrast_ratio:.2f}:1")

    print("\nWCAG 2.1 Compliance (Normal Text):")
    if contrast_ratio >= 7:
        print("  AAA: Pass (Contrast ratio >= 7:1)")
    elif contrast_ratio >= 4.5:
        print("  AA: Pass (Contrast ratio >= 4.5:1)")
    else:
        print("  Fail (Contrast ratio < 4.5:1)")

    print("\nWCAG 2.1 Compliance (Large Text / UI Components):")
    if contrast_ratio >= 4.5:
        print("  AAA: Pass (Contrast ratio >= 4.5:1)")
    elif contrast_ratio >= 3:
        print("  AA: Pass (Contrast ratio >= 3:1)")
    else:
        print("  Fail (Contrast ratio < 3:1)")
