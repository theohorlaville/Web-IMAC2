<template>
  <div class="event">
    <a v-bind:href="eventUrl" target="blank">
      <div class="info-minia">
        <h2>{{ titre }}</h2>
        <p>{{ date }}</p>
        <i>
          <p>{{ genre }}</p>
        </i>
      </div>
      <img v-bind:src="pictureUrl" class="img-minia" />
    </a>
  </div>
</template>

<script>
export default {
  name: "event",

  props: {
    date: String,
    titre: String,
    genre: String,
    pictureUrl: String,
    eventUrl: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 20px;
  overflow-wrap: break-word;
  margin: 0% 1px 0% 1px;
}
p {
  margin: 0% 1px 0% 1px;
}
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition-duration: 0.2s;
}

.info-minia {
  display: none;
  height: 50vh;
  position: absolute;
  background-image: none;
  width: 18vw;
  min-width: 300px;

  z-index: 2;
  transition-duration: 0.2s;
  color: white;
  margin-bottom: 0;
}

.event:hover .info-minia {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  transition-duration: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event:hover .img-minia {
  filter: blur(10px);
  transform: scale(0.9);
  transition-duration: 0.2s;
}

.img-minia {
  width: 100%;
  height: 50vh;
  object-fit: cover;
  border-radius: 8px;
  transform: scale(1);
  transition-duration: 0.2s;
}

@media screen and (max-width: 768px) {
  .info-minia {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    );
  }
  h2 {
    font-size: 12px;
  }
}
</style>
