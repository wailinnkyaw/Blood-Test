<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app dark :disable-route-watcher="drw">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="red darken-2" dark app>
      Kayuna
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon @click="sidebarControl">more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    items: ["All", "Family", "Friends", "Coworkers"],
    sidebar: false,
    clipped: false,
    menuItems: [
      { title: "Group", path: "/", icon: "home" },
      { title: "Blood-Type", path: "/blood-type", icon: "face" },
      { title: "Donor", path: "/donor", icon: "lock_open" }
    ],
    drw: true,
    expand: false,
    model: null,
    states: [
      "Iowa",
      "Kentucky",
      "Louisiana",
      "Kansas",
      "Maine",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ]
  }),
  methods: {
    sidebarControl: function(event) {
      if (this.sidebar == false) {
        this.sidebar = true;
      } else {
        this.sidebar = false;
      }
    }
  }
};
</script>
