AFRAME.registerComponent("room", {
  schema: {
    radius: { default: 4, type: "int" },
    height: { default: 4, type: "int" },
    sides: { default: 4, type: "int" },
    texture: { default: "" },
  },

  init: function () {
    this.walls = document.createElement("a-cylinder");
    this.walls.setAttribute("radius", this.data.radius);
    this.walls.setAttribute("height", this.data.height);
    this.walls.setAttribute("segments-radial", this.data.sides);
    this.walls.setAttribute("open-ended", "true");
    this.walls.setAttribute("material", "color", "white");
    this.walls.setAttribute("material", "side", "double");
    this.walls.setAttribute("position", {
      x: 0,
      y: this.data.height / 2,
      z: 0,
    });
    this.walls.setAttribute("rotation", { x: 0, y: 45, z: 0 });
    this.walls.setAttribute("material", "src", this.data.texture);

    this.el.sceneEl.appendChild(this.walls);

    this.roof = document.createElement("a-circle");
    this.roof.setAttribute("radius", this.data.radius);
    this.roof.setAttribute("height", this.data.height);
    this.roof.setAttribute("segments", this.data.sides);
    this.roof.setAttribute("material", "color", "white");
    this.roof.setAttribute("material", "side", "double");
    this.roof.setAttribute("position", { x: 0, y: this.data.height, z: 0 });
    this.roof.setAttribute("rotation", { x: 90, y: -45, z: 0 });
    this.roof.setAttribute("material", "src", this.data.texture);
    this.el.sceneEl.appendChild(this.roof);
  },

  update() {
    this.roof.setAttribute("segments", this.data.sides);
    this.walls.setAttribute("segments-radial", this.data.sides);
    this.walls.setAttribute("material", "repeat", { x: this.data.sides, y: 1 });
    this.walls.setAttribute("material", "src", this.data.texture);
    this.roof.setAttribute("material", "src", this.data.texture);
  },
});
