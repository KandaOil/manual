<template>
    <div id="new-manual">
        <h3>New Manual</h3>
        <h5>Project</h5>
        <div class="row">
            <form @submit.prevent="saveManual" class="col s12">
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_id" required>
                        <label>Project ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_name" required>
                        <label>Project Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_des" required>
                        <label>Project Description</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
            <br>
            <h5>Page</h5>
            <form @submit.prevent="saveManual" class="col s12">
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_id" required>
                        <label>Page ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_name" required>
                        <label>Page Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-filed col s12">
                        <input type="text" v-model="project_des" required>
                        <label>Page Description</label>
                    </div>
                </div>
                <div>
                    <input type="file" @change="onFileChange" >
                    <br>
                    <div id="preview" @click="addLabel">
                        <img v-if="url" :src="url" id="picture" >
                    </div>
                </div>
                <div class="label-circle" v-for="(label, i) in labels" :key="i" :style="'left: ' + label.x + 'px; top: ' + label.y + 'px'">
                    {{ i + 1 }}
                </div>
                <!-- end circle -->
                <!-- start textarea -->
                <div class="container">
                    <div class="col-12">
                        <div class="row">
                            <div v-for="(item, i) in labels" :key="i">
                                <p>{{ i + 1 }}</p>
                                <textarea v-model="item.description" id="" rows="12" cols="170"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<style>
 #preview {
  position: relative;
  border: 2px solid rgb(148, 146, 146);
  display: inline-block;
  /* width: 300px;
  height: 300px; */
    margin-left: 20%; 
} 
.label-circle {
  width: 30px;
  height: 30px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
}
</style>

<script>
import db from './firebaseInit.js'
export default {
    name: 'new-manual',
    data () {
        return {
            project_id: null,
            project_name: null,
            project_des: null,
            url: null,
            labels: []
        }
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        addLabel (e) {
            var x = e.pageX
            var y = e.pageY
            //console.log(e,x,y)
            var labelLength = this.labels.length
            //console.log(labelLength)
            this.labels.push({
                x: x,
                y: y,
                description: ''
            })
        },
        saveManual () {
            db.collection('projects').add({
                project_id: this.project_id,
                project_name: this.project_name,
                project_des: this.project_des
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>

