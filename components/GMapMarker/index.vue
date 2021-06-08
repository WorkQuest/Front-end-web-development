<template>
  <div
    v-if="!markerLoaded"
    class="GMap__Marker"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      marker: null,
      markerLoaded: false,
      events: ['click', 'mouseover', 'mouseout'],
    };
  },

  watch: {
    options(value) {
      if (value.icon) {
        this.marker.setIcon = value;
      }
    },
  },
  methods: {
    init() {
      let child;
      this.marker = null;
      this.markerLoaded = false;
      this.position.lat = parseFloat(this.position.lat);
      this.position.lng = parseFloat(this.position.lng);
      this.marker = new this.$parent.google.maps.Marker({
        position: this.position,
        map: this.$parent.map,
        ...this.options,
      });

      this.$parent.markers.push(this.marker);
      this.markerLoaded = true;

      if (this.$children.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        child = this.$children[0];
        child.initInfoWindow();
      }

      this.events.forEach((event) => {
        this.$parent.google.maps.event.addListener(this.marker, event, (e) => {
          if (child !== undefined && event === 'click') child.infoWindow.open(this.$parent.map, this.marker);
          this.$emit(event, {
            position: this.position, event: e, map: this.$parent.map, marker: this.marker,
          });
        });
      });
    },
  },
};
</script>
