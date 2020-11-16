
AFRAME.registerComponent('color-picker', {

    dependencies: ['hand-tracking-mesh'],

    init: function() {

        let picker = function(ctx, texture, color) {
            let picker = document.createElement("a-box");
            picker.setAttribute("width", 0.02);
            picker.setAttribute("height", 0.02);
            picker.setAttribute("depth", 0.02);
            picker.setAttribute("material", {
                color: "white",
                src: texture
            });
            picker.addEventListener('raycaster-intersected', evt => {
                picker.setAttribute('scale', '1.2 1.2 1.2');
                ctx.painter.setAttribute('painter', {
                    color: color
                });
                ctx.room.setAttribute("material", {
                    src: texture
                });
            });
            picker.addEventListener('raycaster-intersected-cleared', evt => {
                picker.setAttribute('scale', '1 1 1');
            });
            ctx.el.sceneEl.appendChild(picker);
            return picker
        }

        this.handTracking = this.el.components['hand-tracking-mesh'];

        this.painter = document.querySelector("[painter]");
        this.room = document.querySelector("#room");

        this.picker1 = picker(this, "textures/triangle.jpg", "white");
        this.picker2 = picker(this, "textures/hexagon.jpg", "red");
        this.picker3 = picker(this, "textures/mosaic.jpg", "black");
    },

    tick: function() {
        if (this.handTracking.jointsLoaded() && this.handTracking.mesh != null) {
            const joint = this.handTracking.getJoints()[0]

            this.picker1.setAttribute('visible', joint.visible);
            this.picker2.setAttribute('visible', joint.visible);
            this.picker3.setAttribute('visible', joint.visible);

            this.picker1.object3D.position.copy(joint.position.clone().add(new THREE.Vector3(0, 1.5, 0)));
            this.picker1.object3D.quaternion.copy(new THREE.Quaternion(joint.orientation.x, joint.orientation.y, joint.orientation.z, joint.orientation.w));
            this.picker1.object3D.rotateY(Math.PI / 2);
            this.picker1.object3D.translateZ(-0.04);

            this.picker2.object3D.position.copy(joint.position.clone().add(new THREE.Vector3(0, 1.5, 0)));
            this.picker2.object3D.quaternion.copy(new THREE.Quaternion(joint.orientation.x, joint.orientation.y, joint.orientation.z, joint.orientation.w));
            this.picker2.object3D.rotateY(Math.PI / 2);
            this.picker2.object3D.translateZ(-0.07);

            this.picker3.object3D.position.copy(joint.position.clone().add(new THREE.Vector3(0, 1.5, 0)));
            this.picker3.object3D.quaternion.copy(new THREE.Quaternion(joint.orientation.x, joint.orientation.y, joint.orientation.z, joint.orientation.w));
            this.picker3.object3D.rotateY(Math.PI / 2);
            this.picker3.object3D.translateZ(-0.1);

        }

    }

});