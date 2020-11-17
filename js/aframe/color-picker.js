AFRAME.registerComponent("color-picker", {
  dependencies: ["hand-tracking-mesh"],

  init: function () {
    let setRoomSides = function (room, sides) {
      walls = room.querySelector("#walls");
      roof = room.querySelector("#roof");
    //   walls.setAttribute("material", {
    //     repeat: sides,
    //   });
      walls.setAttribute("segments-radial", sides);
      roof.setAttribute("segments", sides);
    };

    let setRoomTexture = function (room, texture) {
      walls = room.querySelector("#walls");
      roof = room.querySelector("#roof");
      walls.setAttribute("material", {
        src: texture,
      });
      roof.setAttribute("material", {
        src: texture,
      });
    };

    let roomPicker = function (ctx, texture, sides) {
      let picker = document.createElement("a-cylinder");
      picker.setAttribute("radius", 0.02);
      picker.setAttribute("height", 0.005);
      picker.setAttribute("segments-radial", sides);
      picker.setAttribute("material", {
        color: "white",
        src: texture,
      });
      picker.addEventListener("raycaster-intersected", (evt) => {
        picker.setAttribute("scale", "1.2 1.2 1.2");
        setRoomTexture(ctx.room, texture);
        setRoomSides(ctx.room, sides);
      });
      picker.addEventListener("raycaster-intersected-cleared", (evt) => {
        picker.setAttribute("scale", "1 1 1");
      });
      ctx.el.sceneEl.appendChild(picker);
      return picker;
    };

    this.handTracking = this.el.components["hand-tracking-mesh"];

    this.painter = document.querySelector("[painter]");
    this.room = document.querySelector("#room");

    this.picker1 = roomPicker(this, "textures/tiles.jpg", 3);
    this.picker2 = roomPicker(this, "textures/hexagon.jpg", 6);
    this.picker3 = roomPicker(this, "textures/mosaic.jpg", 8);
  },

  tick: function () {
    if (this.handTracking.jointsLoaded() && this.handTracking.mesh != null) {
      const joint = this.handTracking.getJoints()[0];

      this.picker1.setAttribute("visible", joint.visible);
      this.picker1.object3D.position.copy(
        joint.position.clone().add(new THREE.Vector3(0, 1.5, 0))
      );
      this.picker1.object3D.quaternion.copy(
        new THREE.Quaternion(
          joint.orientation.x,
          joint.orientation.y,
          joint.orientation.z,
          joint.orientation.w
        )
      );
      this.picker1.object3D.rotateY(Math.PI / 2);
      this.picker1.object3D.translateX(-0.1);
      this.picker1.object3D.translateY(0.01);
      this.picker1.object3D.translateZ(0.05);

      this.picker2.setAttribute("visible", joint.visible);
      this.picker2.object3D.position.copy(
        joint.position.clone().add(new THREE.Vector3(0, 1.5, 0))
      );
      this.picker2.object3D.quaternion.copy(
        new THREE.Quaternion(
          joint.orientation.x,
          joint.orientation.y,
          joint.orientation.z,
          joint.orientation.w
        )
      );
      this.picker2.object3D.rotateY(Math.PI / 2);
      this.picker2.object3D.translateZ(0.05);
      this.picker2.object3D.translateY(0.01);
      this.picker2.object3D.translateX(-0.15);

      this.picker3.setAttribute("visible", joint.visible);
      this.picker3.object3D.position.copy(
        joint.position.clone().add(new THREE.Vector3(0, 1.5, 0))
      );
      this.picker3.object3D.quaternion.copy(
        new THREE.Quaternion(
          joint.orientation.x,
          joint.orientation.y,
          joint.orientation.z,
          joint.orientation.w
        )
      );
      this.picker3.object3D.rotateY(Math.PI / 2);
      this.picker3.object3D.translateX(-0.2);
      this.picker3.object3D.translateY(0.01);
      this.picker3.object3D.translateZ(0.05);
    }
  },
});
