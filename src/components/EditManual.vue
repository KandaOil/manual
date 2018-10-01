<template>
    <div id="edit-manual">
        <nav>
            <div class="nav-wrapper blue">
                <div class="container">
                    <router-link to="/" class="brand-logo">Manual Manager</router-link>
                </div>
            </div>
        </nav>
        <h3>Edit Manual</h3>
        <div class="row">
            <form @submit.prevent="updateManual" class="col s12">
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_des" required>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from "./firebaseInit.js";
export default {
  name: "edit-manual",
  data() {
    return {
      project_id: null,
      project_name: null,
      project_des: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("projects")
      .where("project_id", "==", to.params.project_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            (vm.project_id = doc.data().project_id),
              (vm.project_name = doc.data().project_name),
              (vm.project_des = doc.data().project_des);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db
        .collection("projects")
        .where("project_id", "==", this.$route.params.project_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            (this.project_id = doc.data().project_id),
              (this.project_name = doc.data().project_name),
              (this.project_des = doc.data().project_des);
          });
        });
    },
    updateManual() {
      db
        .collection("projects")
        .where("project_id", "==", this.$route.params.project_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                project_id: this.project_id,
                project_name: this.project_name,
                project_des: this.project_des
              })
              .then(() => {
                this.$router.push({
                  name: "view-manual",
                  params: { project_id: this.project_id }
                });
              });
          });
        });
    }
  }
};
</script>

