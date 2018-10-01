<template>
    <div id="dashboard">
        <nav>
            <div class="nav-wrapper blue">
                <div class="container">
                    <router-link to="/" class="brand-logo">Manual Manager</router-link>
                </div>
            </div>
        </nav>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Projects</h4>
            </li>
            <li v-for="project in projects" v-bind:key="project.id" class="collection-item">
                <div class="chip">{{project.project_id}}</div>
                {{project.project_name}}:{{project.project_des}}
                <router-link class="secondary-content" v-bind:to="{name:'view-manual', params: {project_id: project.project_id}}">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      projects: []
    };
  },
  created() {
    db
      .collection("projects")
      .orderBy("project_id")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id);
          const data = {
            id: doc.id,
            project_id: doc.data().project_id,
            project_name: doc.data().project_name,
            project_des: doc.data().project_des,
            pages: doc.data().pages
          };
          this.projects.push(data);
        });
      });
  }
};
</script>

