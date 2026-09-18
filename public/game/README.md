# STRAFE OPERATOR web export

Godot 4.7 HTML5 build lives here so Next can serve it at `/game/index.html`
and embed it on `/demo`.

## Export (from Strafe.Game)

```bash
sh tools/export_web.sh
```

Or:

```bash
/Applications/Godot.app/Contents/MacOS/Godot --headless --path /Users/aritemkin/Desktop/Cursor/Strafe.Game --export-release Web export/web/index.html
cp -R /Users/aritemkin/Desktop/Cursor/Strafe.Game/export/web/. /Users/aritemkin/Desktop/Cursor/Strafe.Live/public/game/
```

Preset already excludes Meshy GLBs, Mixamo FBX/PNGs, unused Kenney trees, and
the unused lineup banner. Thread support is **off** (no SharedArrayBuffer /
COOP-COEP required). Custom feature `strafe_lite` skips Meshy at runtime,
caps explosion particles, and caps tree MultiMesh counts.

Needs Godot **Web export templates** installed.
