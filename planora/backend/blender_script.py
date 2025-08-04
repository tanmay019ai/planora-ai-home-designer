# blender_script.py

import bpy
import sys
import json
import math

# ───── CLI Args ─────
argv = sys.argv
argv = argv[argv.index("--") + 1:]
output_file = argv[0]

# ───── Load layout.json (but ignore it) ─────
with open("layout.json", "r") as f:
    _ = json.load(f)  # Dummy load to keep your API flow

# ───── Clean Scene ─────
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# ───── CONFIGS ─────
FLOOR_WIDTH = 12
FLOOR_DEPTH = 10
WALL_THICKNESS = 0.3
WALL_HEIGHT = 4
ROOF_HEIGHT = 2.5
DOOR_WIDTH = 1.2
DOOR_HEIGHT = 2.2
WINDOW_WIDTH = 1.5
WINDOW_HEIGHT = 1.2

# ───── FLOOR ─────
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
floor = bpy.context.object
floor.scale = (FLOOR_WIDTH / 2, FLOOR_DEPTH / 2, 1)
floor.name = "Floor"
floor_mat = bpy.data.materials.new(name="FloorMaterial")
floor_mat.diffuse_color = (0.4, 0.3, 0.2, 1)
floor.data.materials.append(floor_mat)

# ───── WALLS ─────
wall_mat = bpy.data.materials.new(name="WallMaterial")
wall_mat.diffuse_color = (0.85, 0.85, 0.85, 1)

def create_wall(x, y, scale_x, scale_y):
    bpy.ops.mesh.primitive_cube_add(location=(x, y, WALL_HEIGHT / 2))
    wall = bpy.context.object
    wall.scale = (scale_x, scale_y, WALL_HEIGHT / 2)
    wall.data.materials.append(wall_mat)
    return wall

# Left / Right / Front / Back
create_wall(-FLOOR_WIDTH / 2, 0, WALL_THICKNESS, FLOOR_DEPTH / 2)
create_wall(FLOOR_WIDTH / 2, 0, WALL_THICKNESS, FLOOR_DEPTH / 2)
front_wall = create_wall(0, -FLOOR_DEPTH / 2, FLOOR_WIDTH / 2, WALL_THICKNESS)
create_wall(0, FLOOR_DEPTH / 2, FLOOR_WIDTH / 2, WALL_THICKNESS)

# ───── DOOR CUT ─────
bpy.ops.mesh.primitive_cube_add(location=(0, -FLOOR_DEPTH / 2 + WALL_THICKNESS / 2, DOOR_HEIGHT / 2))
door = bpy.context.object
door.scale = (DOOR_WIDTH / 2, WALL_THICKNESS / 2 + 0.01, DOOR_HEIGHT / 2)
mod = front_wall.modifiers.new(name="DoorCut", type='BOOLEAN')
mod.object = door
mod.operation = 'DIFFERENCE'
bpy.context.view_layer.objects.active = front_wall
bpy.ops.object.modifier_apply(modifier="DoorCut")
bpy.data.objects.remove(door)

# ───── WINDOWS ─────
def add_window(x, y, wall_obj):
    bpy.ops.mesh.primitive_cube_add(location=(x, y, WINDOW_HEIGHT + 0.8))
    win = bpy.context.object
    win.scale = (WINDOW_WIDTH / 2, WALL_THICKNESS / 2 + 0.01, WINDOW_HEIGHT / 2)
    mod = wall_obj.modifiers.new(name="WindowCut", type='BOOLEAN')
    mod.object = win
    mod.operation = 'DIFFERENCE'
    bpy.context.view_layer.objects.active = wall_obj
    bpy.ops.object.modifier_apply(modifier="WindowCut")
    bpy.data.objects.remove(win)

# Left window
left_wall = [obj for obj in bpy.data.objects if round(obj.location.x, 2) == -FLOOR_WIDTH / 2][0]
add_window(-FLOOR_WIDTH / 2, 2, left_wall)

# Right window
right_wall = [obj for obj in bpy.data.objects if round(obj.location.x, 2) == FLOOR_WIDTH / 2][0]
add_window(FLOOR_WIDTH / 2, -2, right_wall)

# ───── ROOF ─────
roof_mat = bpy.data.materials.new(name="RoofMaterial")
roof_mat.diffuse_color = (0.3, 0.1, 0.05, 1)

roof_z = WALL_HEIGHT + ROOF_HEIGHT / 2
angle = math.radians(30)

# Left slope
bpy.ops.mesh.primitive_cube_add(location=(0, 0, roof_z))
r1 = bpy.context.object
r1.scale = (FLOOR_WIDTH / 2, FLOOR_DEPTH / 2, ROOF_HEIGHT / 2)
r1.rotation_euler[1] = -angle
r1.data.materials.append(roof_mat)

# Right slope
bpy.ops.mesh.primitive_cube_add(location=(0, 0, roof_z))
r2 = bpy.context.object
r2.scale = (FLOOR_WIDTH / 2, FLOOR_DEPTH / 2, ROOF_HEIGHT / 2)
r2.rotation_euler[1] = angle
r2.data.materials.append(roof_mat)

# ───── LIGHTING & CAMERA ─────
bpy.ops.object.light_add(type='SUN', location=(20, -20, 30))
light = bpy.context.object
light.data.energy = 3

bpy.ops.object.camera_add(location=(20, -20, 15))
cam = bpy.context.object
cam.rotation_euler = (math.radians(65), 0, math.radians(45))
bpy.context.scene.camera = cam

# ───── EXPORT TO GLB ─────
bpy.ops.export_scene.gltf(
    filepath=output_file,
    export_format='GLB',
    export_apply=True
)
