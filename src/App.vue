<template>
  <div id="app">
    <top></top>

    <div id="filters">
      <select class="w3-select" v-model="eventSortType" id="event-sort">
        <option value="AZArt">Event Alphabétique</option>
        <option value="ZAArt">Event !Alphabétique</option>
        <option value="AZGenre">Genre Alphabétique</option>
        <option value="ZAGenre">Genre !Alphabétique</option>
      </select>

      <input
        type="text"
        class="w3-input"
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
    <div id="event-container">
      <div v-for="event in eventOrganizedData" :key="event.id" class="events">
        <event
          :titre="event.name"
          :pictureUrl="event.images[0].url"
          :date="event.dates.start.localDate"
          :eventUrl="event.url"
          :genre="event.genre"
        ></event>
      </div>
    </div>

    <div id="test" v-if="loading">
      <svg
        class="spinner"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
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
      let field = ["AZArt", "ZAArt"].includes(this.eventSortType)
        ? "name"
        : "genre";
      const reversed = ["ZAArt", "ZAGenre"].includes(this.eventSortType);

      console.log("Type de tri : " + field + " Inversé ? " + reversed);

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
      searchEvent: localStorage.getItem("searchEvent") || "",
      page: "0",
      eventSortType: localStorage.getItem("eventSortType") || "AZArt",
      loading: false,
    };
  },

  created: function () {
    this.retrieveEventsData();
  },

  watch: {
    searchEvent: function (newSearch) {
      localStorage.setItem("searchEvent", newSearch);
    },
    eventSortType: function (newEventSortType) {
      localStorage.setItem("eventSortType", newEventSortType);
    },
  },

  methods: {
    async retrieveEventsData() {
      this.loading = true;
      this.tempArray = await getEvent(this.page);
      this.eventsData = [...this.eventsData, ...this.tempArray]; /*
      this.eventsData.forEach((element) => {
        if (!element.classifications) {
          const segment = {
            segment: {
              name: "No-genre",
            },
          };
          element.classifications = [];
          element.classifications[0] = segment;
        }
      });*/
      this.loaded();
    },
    cleanSearch: function () {
      this.searchEvent = "";
    },
    loadMore: function () {
      this.page++;
      this.retrieveEventsData();
    },
    loaded: function () {
      this.loading = false;
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

#event-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.events {
  margin: 10px;
  width: 18vw;
  height: auto;
  min-width: 300px;
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

#test {
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}

.spinner {
  -webkit-animation: rotator 1.4s linear infinite;
  animation: rotator 1.4s linear infinite;
}

@-webkit-keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  -webkit-animation: dash 1.4s ease-in-out infinite,
    colors 5.6s ease-in-out infinite;
  animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
}

@-webkit-keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
