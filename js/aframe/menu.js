AFRAME.registerComponent("menu", {
  dependencies: ["hand-tracking-mesh"],

  picker: function (action) {
    let object = document.createElement("a-cylinder");
    object.setAttribute("radius", 0.02);
    object.setAttribute("height", 0.005);
    object.addEventListener("raycaster-intersected", (evt) => {
      object.setAttribute("scale", "1.2 1.2 1.2");
      action();
    });
    object.addEventListener("raycaster-intersected-cleared", (evt) => {
      object.setAttribute("scale", "1 1 1");
    });
    this.el.sceneEl.appendChild(object);
    return object;
  },

  texturePicker: function (texture, repeat) {
    let picker = this.picker(() => {
      this.room.setAttribute("room", "repeat", repeat);
      this.room.setAttribute("room", "texture", texture);
    });
    picker.setAttribute("material", "src", texture);
    return picker;
  },

  sidePicker: function (sides) {
    let picker = this.picker(() => {
      this.room.setAttribute("room", "sides", sides);
    });
    picker.setAttribute("segments-radial", sides);
    return picker;
  },

  colorPicker: function (color) {
    let picker = this.picker(() => {
      this.painter.setAttribute("painter", "color", color);
    });
    picker.setAttribute("material", "color", color);
    return picker;
  },

  init: function () {
    this.handTracking = this.el.components["hand-tracking-mesh"];
    this.painter = document.querySelector("[painter]");
    this.room = document.querySelector("[room]");

    this.menu = [];

    this.menu.push(this.sidePicker(3));
    this.menu.push(this.sidePicker(4));
    this.menu.push(this.sidePicker(5));
    this.menu.push(this.sidePicker(6));
    this.menu.push(this.sidePicker(8));

    this.menu.push(this.texturePicker("#triangle", 4));
    this.menu.push(this.texturePicker("#square", 4));
    this.menu.push(this.texturePicker("#rombus", 3));
    this.menu.push(this.texturePicker("#hexagon", 6));
    this.menu.push(this.texturePicker("#circle", 4));

    this.menu.push(this.colorPicker("#264653"));
    this.menu.push(this.colorPicker("#2a9d8f"));
    this.menu.push(this.colorPicker("#e9c46a"));
    this.menu.push(this.colorPicker("#f4a261"));
    this.menu.push(this.colorPicker("#e76f51"));
  },

  tick: function () {
    if (this.handTracking.jointsLoaded() && this.handTracking.mesh != null) {
      const joint = this.handTracking.getJoints()[0];

      let place = (object, x, y, z) => {
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

      let displayMenu = (columns, spacing, menu_x, menu_y, menu_z) => {
        for (index = 0; index < this.menu.length; index++) {
          element = this.menu[index];
          var x = menu_x - spacing * (1 + (index % columns));
          var y = menu_y;
          var z = menu_z - spacing * (1 + Math.floor(index / columns));
          place(element, x, y, z);
        }
      };

      displayMenu(5, 0.043, -0.05, 0.01, 0.18);
    }
  },
});
