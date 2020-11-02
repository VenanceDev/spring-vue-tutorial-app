<template>
    <div  class="edit-form">
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title"
                v-model="currentTutorial.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description"
                v-model="currentTutorial.description"
                />
            </div>

            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentTutorial.published ? "Published" : "Pending" }}
            </div>
        </form>

        <button class="badge badge-primary mr-2"
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
        >
        UnPublish
        </button>
        <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
        >
        Publish
        </button>

        <button class="badge badge-danger mr-2"
        @click="deleteTutorial"
        >
        Delete
        </button>

        <button type="submit" class="badge badge-success"
        @click="updateTutorial"
        >
        Update
        </button>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TutorialDataService from '../services/TutorialDataService';
export default {
    name: 'edit-tutorial-form',
    data() {
        return {
            message: ''
        }
    },
    computed: {
        ...mapState(['currentTutorial', 'currentIndex'])
    },
    methods: {
        ...mapActions(['setCurrentTutorial', 'setTutorials']),
        updatePublished(status) {
            var data = {
                id: this.currentTutorial.id,
                title: this.currentTutorial.title,
                description: this.currentTutorial.description,
                published: status
            }
            this.setCurrentTutorial({newCurTuto:data, newCurIndex:this.currentIndex})
        },
        deleteTutorial() {
            TutorialDataService.delete(this.currentIndex)
                .then(response => {
                    this.setTutorials(response.data)
                    this.setCurrentTutorial({newCurTuto:null, newCurIndex:-1})
                    this.$router.push('/tutorials')
                })
                .catch(e => console.log(e));
        },
        updateTutorial() {
            TutorialDataService.update(this.currentIndex, this.currentTutorial)
                .then(response => {
                    console.log(response.data)
                    this.message = 'The tutorial was updated successfully!';
                })
                .catch(e => console.log(e));
        }
    },
    beforeDestroy() {
        if(this.currentIndex != -1){
            TutorialDataService.get(this.currentIndex)
            .then(response => {
                this.setCurrentTutorial({newCurTuto:response.data, newCurIndex:this.currentIndex})
            })
            .catch(e => console.log(e));
        }
    }
}
</script>