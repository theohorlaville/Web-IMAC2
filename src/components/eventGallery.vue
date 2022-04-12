<template>
  <div id="gallerie">
    <event msg="concert 1"></event>
    <event msg="concert 2"></event>
    <event msg="concert 3"></event>
    <event msg="concert 4"></event>
    <event msg="concert 5"></event>
  </div>
</template>

<script>
import event from "./event.vue";

export default {
  components: { event },
  name: "eventGallery",
};
</script>

<style scoped>
#gallerie {
  display: flex;
  justify-content: center;
  background-color: lightcyan;
}
</style>