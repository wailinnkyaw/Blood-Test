<template>
  <v-card>
    <v-card-text>
      <v-alert type="error" :value="isError">GG pl</v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="gg">Say What</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    isError: false
  }),
  methods: {
    gg() {
      if (this.isError) {
        this.isError = false;
      } else {
        this.isError = true;
      }
    }
  }
};
</script>