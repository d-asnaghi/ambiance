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

    let texturePicker = (texture, repeat, normal) => {
      texture = texture || "";
      repeat = repeat || 1;
      normal = normal || "";
      let shape = document.createElement("a-cylinder");
      shape.setAttribute("radius", 0.02);
      shape.setAttribute("height", 0.005);
      shape.setAttribute("material", "color", "white");
      shape.setAttribute("material", "src", texture);
      return picker(shape, () => {
        this.room.setAttribute("room", "repeat", repeat);
        this.room.setAttribute("room", "normal", normal);
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

    let colorPicker = (color) => {
      let shape = document.createElement("a-cylinder");
      shape.setAttribute("radius", 0.02);
      shape.setAttribute("height", 0.005);
      shape.setAttribute("material", "color", color);
      return picker(shape, () => {
        this.painter.setAttribute("painter", "color", color);
      });
    };

    this.menuItems = [];

    this.menuItems.push(sidePicker(3));
    this.menuItems.push(sidePicker(4));
    this.menuItems.push(sidePicker(5));
    this.menuItems.push(sidePicker(6));
    this.menuItems.push(sidePicker(8));

    this.menuItems.push(texturePicker("#triangle", 4));
    this.menuItems.push(texturePicker("#square", 4));
    this.menuItems.push(texturePicker("#rombus", 3));
    this.menuItems.push(texturePicker("#hexagon", 6));
    this.menuItems.push(texturePicker("#circle", 4));

    this.menuItems.push(colorPicker("#264653"));
    this.menuItems.push(colorPicker("#2a9d8f"));
    this.menuItems.push(colorPicker("#e9c46a"));
    this.menuItems.push(colorPicker("#f4a261"));
    this.menuItems.push(colorPicker("#e76f51"));
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

      let menu = (columns, spacing, menu_x, menu_y, menu_z) => {
        for (index = 0; index < this.menuItems.length; index++) {
          element = this.menuItems[index];
          var x = menu_x - spacing * (1 + (index % columns));
          var y = menu_y;
          var z = menu_z - spacing * (1 + Math.floor(index / columns));
          place(element, x, y, z);
        }
      };

      menu(5, 0.043, -0.05, 0.01, 0.18);
    }
  },
});
