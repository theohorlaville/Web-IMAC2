<template>
  <div class="event">
    <div class="info-mina">
      <h2>{{ titre }}</h2>
      <p>{{ date }}</p>
    </div>
    <img v-bind:src="pictureUrl" class="img-minia" />
  </div>
</template>

<script>
export default {
  name: "event",

  props: {
    date: String,
    titre: String,
    pictureUrl: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 1vw;
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
  cursor: pointer;
}

.info-mina {
  display: none;
  height: 50vh;
  position: absolute;
  background-image: none;
  width: 18vw;
  z-index: 2;
  transition-duration: 0.2s;
  color: white;
  margin-bottom: 0;
}

.event:hover .info-mina {
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
</style>
