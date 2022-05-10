<template>
  <div class="header">
    <h1>Wonderful Events</h1>
    <div id="filters">
      <select
        class="w3-select"
        v-on:input="emitSort"
        :value="sort"
        id="event-sort"
      >
        <option value="AZArt">Event Alphabétique</option>
        <option value="ZAArt">Event !Alphabétique</option>
        <option value="AZGenre">Genre Alphabétique</option>
        <option value="ZAGenre">Genre !Alphabétique</option>
      </select>

      <input
        type="text"
        class="w3-input"
        v-on:input="emitFilter"
        :value="filter"
        placeholder="Chercher un event"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "top",

  props: ["sort", "filter"],
  methods: {
    emitSort: function (event) {
      this.$emit("sortEvent", event.target.value);
    },
    emitFilter: function (event) {
      this.$emit("filterEvent", event.target.value);
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