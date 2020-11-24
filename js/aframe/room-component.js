AFRAME.registerComponent("room", {
  schema: {
    radius: { default: 4, type: "int" },
    height: { default: 4, type: "int" },
    sides: { default: 4, type: "int" },
    repeat: { default: 1, type: "int" },
    texture: { default: "" },
    normal: { default: "" },
    roughness: { default: 0.6, type: "float" },
    metalness: { default: 0.2, type: "float" },
  },

  updateMaterial: function (element, sides, multiplier) {
    multiplier = multiplier || 1;
    let repeat = { x: this.data.repeat * sides * multiplier, y: this.data.repeat * multiplier };
    element.setAttribute("material", {
      src: this.data.texture,
      repeat: repeat,
      normalMap: this.data.normal,
      normalTextureRepeat: repeat,
      metalness: this.data.metalness,
      roughness: this.data.roughness,
    });
  },

  init: function () {
    // Walls.
    this.walls = document.createElement("a-cylinder");
    this.walls.setAttribute("material", "color", "white");
    this.walls.setAttribute("material", "side", "double");
    this.updateMaterial(this.walls, this.data.sides);
    this.walls.setAttribute("radius", this.data.radius);
    this.walls.setAttribute("height", this.data.height);
    this.walls.setAttribute("segments-radial", this.data.sides);
    this.walls.setAttribute("open-ended", "true");
    this.walls.setAttribute("position", {
      x: 0,
      y: this.data.height / 2,
      z: 0,
    });
    this.walls.setAttribute("rotation", { x: 0, y: 45, z: 0 });
    this.el.sceneEl.appendChild(this.walls);
    // Roof.
    this.roof = document.createElement("a-circle");
    this.roof.setAttribute("material", "color", "white");
    this.roof.setAttribute("material", "side", "double");
    this.updateMaterial(this.roof, 1);
    this.roof.setAttribute("radius", this.data.radius);
    this.roof.setAttribute("height", this.data.height);
    this.roof.setAttribute("segments", this.data.sides);
    this.roof.setAttribute("position", { x: 0, y: this.data.height, z: 0 });
    this.roof.setAttribute("rotation", { x: 90, y: -45, z: 0 });
    this.el.sceneEl.appendChild(this.roof);
    // Floor
    this.floor = document.createElement("a-circle");
    this.floor.setAttribute("material", "color", "white");
    this.floor.setAttribute("material", "side", "double");
    this.updateMaterial(this.roof, 1);
    this.floor.setAttribute("radius", this.data.radius);
    this.floor.setAttribute("height", this.data.height);
    this.floor.setAttribute("segments", this.data.sides);
    this.floor.setAttribute("position", { x: 0, y: 0.01, z: 0 });
    this.floor.setAttribute("rotation", { x: 90, y: -45, z: 0 });
    this.el.sceneEl.appendChild(this.floor);
  },

  update: function () {
    // Update the shape of the room.
    this.walls.setAttribute("segments-radial", this.data.sides);
    this.floor.setAttribute("segments", this.data.sides);
    this.roof.setAttribute("segments", this.data.sides);

    // Update the material of the room.
    this.updateMaterial(this.walls, this.data.sides);
    this.updateMaterial(this.floor, 1, 2);
    this.updateMaterial(this.roof, 1, 2);
  },
});
