<template>
    <div id="view-manual">
        <nav>
            <div class="nav-wrapper blue">
                <div class="container">
                    <router-link to="/" class="brand-logo">Manual Manager</router-link>
                </div>
            </div>
        </nav>
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{project_name}}</h4></li>
            <li class="collection-item">Project ID#: {{project_id}}</li>
            <li class="collection-item">Project Name: {{project_name}}</li>
            <li class="collection-item">Project Description: {{project_des}}</li>
        </ul>
        <table>
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Page Name</th>
                <th scope="col">Page Description</th>
                <th scope="col">Tool</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(page, i) in pages" :key="i">
                <td>{{page.page_id}}</td>
                <td>{{page.page_name}}</td>
                <td>{{page.page_des}}</td>
                <router-link to="/">
                    <td class="fa fa-eye"></td>
                </router-link>
                </tr>
            </tbody>
        </table>
        <br>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteEmployee" class="btn red">Delete</button>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-manual', params: {project_id:project_id}}" class="btn-floating btn-large red">
            <i class="fa fa-pencil"></i>

            </router-link>
        </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-manual",
  data() {
    return {
      project_id: null,
      project_name: null,
      project_des: null,
      pages: null
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
              (vm.project_des = doc.data().project_des),
              (vm.pages = doc.data().pages);
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
              (this.project_des = doc.data().project_des),
              (this.pages = doc.data().pages);
          });
        });
    },
    deleteEmployee() {
      if (confirm("Are you sure?")) {
        db
          .collection("projects")
          .where("project_id", "==", this.$route.params.project_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

