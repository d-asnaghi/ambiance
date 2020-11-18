AFRAME.registerComponent("color-picker", {
  dependencies: ["hand-tracking-mesh"],

  init: function () {
    this.handTracking = this.el.components["hand-tracking-mesh"];
    this.painter = document.querySelector("[painter]");
    this.room = document.querySelector("[room]");

    let picker = (geometry, action) => {
      let picker = geometry;
      picker.addEventListener("raycaster-intersected", (evt) => {
        picker.setAttribute("scale", "1.2 1.2 1.2");
        action();
      });
      picker.addEventListener("raycaster-intersected-cleared", (evt) => {
        picker.setAttribute("scale", "1 1 1");
      });
      this.el.sceneEl.appendChild(picker);
      return picker;
    };

    let texturePicker = (texture) => {
      let shape = document.createElement("a-cylinder");
      shape.setAttribute("radius", 0.02);
      shape.setAttribute("height", 0.005);
      shape.setAttribute("material", "color", "white");
      shape.setAttribute("material", "src", texture);
      return picker(shape, () => {
        this.room.setAttribute("room", "texture", texture);
      });
    };

    let sidePicker = (sides) => {
      let shape = document.createElement("a-cylinder");
      shape.setAttribute("radius", 0.02);
      shape.setAttribute("height", 0.005);
      shape.setAttribute("segments-radial", sides);
      shape.setAttribute("material", "color", "white");
      return picker(shape, () => {
        this.room.setAttribute("room", "sides", sides);
      });
    };

    this.picker1 = texturePicker("textures/tiles.jpg");
    this.picker2 = texturePicker("textures/triangle.jpg");
    this.picker3 = texturePicker("textures/hexagon.jpg");
    this.picker4 = texturePicker("textures/mosaic.jpg");

    this.picker5 = sidePicker(3);
    this.picker6 = sidePicker(4);
    this.picker7 = sidePicker(5);
    this.picker8 = sidePicker(6);
  },

  tick: function () {
    if (this.handTracking.jointsLoaded() && this.handTracking.mesh != null) {
      const joint = this.handTracking.getJoints()[0];

      let place = (object, joint, x, y, z) => {
        object.setAttribute("visible", joint.visible);
        object.object3D.position.copy(
          joint.position.clone().add(new THREE.Vector3(0, 1.5, 0))
        );
        object.object3D.quaternion.copy(
          new THREE.Quaternion(
            joint.orientation.x,
            joint.orientation.y,
            joint.orientation.z,
            joint.orientation.w
          )
        );
        object.object3D.rotateY(Math.PI / 2);
        object.object3D.translateX(x);
        object.object3D.translateY(y);
        object.object3D.translateZ(z);
      };

      place(this.picker1, joint, -0.1, 0.01, 0.05);
      place(this.picker2, joint, -0.15, 0.01, 0.05);
      place(this.picker3, joint, -0.2, 0.01, 0.05);
      place(this.picker4, joint, -0.25, 0.01, 0.05);

      place(this.picker5, joint, -0.1, 0.01, 0.1);
      place(this.picker6, joint, -0.15, 0.01, 0.1);
      place(this.picker7, joint, -0.2, 0.01, 0.1);
      place(this.picker8, joint, -0.25, 0.01, 0.1);
    }
  },
});
