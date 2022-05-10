<template>
  <div class="header">
    <h1>Wonderful Events</h1>
    <p>Looking for the <b>best events</b> ? This is the place for !</p>
  </div>
</template>

<script>
export default {
  name: "top",

  props: {
    filter: String,
    sort: String,
  },

  methods: {
    emitSort: function () {
      this.$emit("sortEvent", "sort");
    },
    emitFilter: function () {
      this.$emit("filterEvent", "filter");
    },
  },
};
</script>

<style scoped>
.header {
  height: auto;
  width: 100%;
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  padding: 0.5%;
  box-shadow: 0 1px 5px black;
}

h1 {
  margin: 0;
}

.search {
  height: auto;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
}

#close {
  width: 1.5%;
  margin-left: 1%;
}
</style>