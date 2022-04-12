<template>
  <div id="app">
    <top></top>
    <div id="filters">
      <select v-model="eventSortType" id="event-sort">
        <option value="AZArt">A --> Z</option>
        <option value="ZAArt">Z --> A</option>
        <option value="AZDate">Date récent</option>
        <option value="ZADate">Date ancien</option>
      </select>

      <input
        type="text"
        v-model="searchEvent"
        placeholder="Chercher un event"
      />

      <img
        v-if="searchEvent"
        @click="cleanSearch"
        src="./assets/close.png"
        id="close"
      />
    </div>

    <div v-for="event in eventOrganizedData" :key="event.id" class="events">
      <event
        :titre="event.name"
        :pictureUrl="event.images[0].url"
        :date="event.dates.start.localDate"
      ></event>
    </div>
    <img @click="loadMore" src="./assets/down.png" id="down" />
    <bottom></bottom>
  </div>
</template>

<script>
import event from "./components/event.vue";
import top from "./components/header.vue";
import bottom from "./components/footer.vue";

import { getEvent } from "@/services/api/api.js";

export default {
  components: { top, event, bottom },
  name: "App",

  computed: {
    eventOrganizedData: function () {
      const field = ["AZArt", "ZAArt"].includes(this.eventSortType)
        ? "name"
        : "dates";
      const reversed = ["ZAArt", "ZADate"].includes(this.eventSortType);
      const filterFunc = (a) =>
        a[field].toLowerCase().includes(this.searchEvent.toLowerCase());
      const comparator = (a, b) => a[field].localeCompare(b[field]);
      let data = this.eventsData.filter(filterFunc);
      data = data.sort(comparator);
      if (reversed) data = data.reverse();
      return data;
    },
  },

  data() {
    return {
      eventsData: [],
      tempArray: [],
      searchEvent: "",
      page: "0",
      eventSortType: "AZArt",
    };
  },

  created: function () {
    this.retrieveEventsData();
  },

  methods: {
    async retrieveEventsData() {
      this.eventsData = await getEvent(this.page);
      //this.tempArray = await getEvent(this.page);
      //this.eventsData.push(this.tempArray);
    },
    cleanSearch: function () {
      this.searchEvent = "";
    },
    loadMore: function () {
      this.page++;
      this.retrieveEventsData();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  height: auto;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

html,
body {
  margin: 0%;
  padding: 0;
}

.events {
  margin: 10px;
  width: 18vw;
  height: auto;
  min-width: 17vw;
}

#close {
  width: 1.5%;
  margin-left: 1%;
}

#filters {
  width: 100%;
}
#down {
  width: 5%;
  margin-top: 2%;
  cursor: pointer;
}
</style>
