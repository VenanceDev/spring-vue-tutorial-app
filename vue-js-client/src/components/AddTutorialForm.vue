<template>
    <div>
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input
                type="text"
                class="form-control"
                id="title"
                required
                v-model="tutorial.title"
                name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input
                class="form-control"
                id="description"
                required
                v-model="tutorial.description"
                name="description"
                />
            </div>

            <button @click="saveTutorial" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import TutorialDataService from '../services/TutorialDataService';
export default {
    name: 'add-tutorial-form',
    data() {
        return {
        tutorial: {
            id: null,
            title: "",
            description: "",
            published: false
        },
        submitted: false
        };
    },
    methods: {
        ...mapActions(['setTutorials']),
        saveTutorial() {
            TutorialDataService.create(this.tutorial)
                .then(response => {
                    console.log(response.data)
                    this.fetchTutorials()
                    this.submitted = true;
                })
                .catch(e => console.log(e));
        },
        newTutorial() {
            this.submitted = false;
            this.tutorial = {};
        },
        fetchTutorials() {
            TutorialDataService.getAll()
            .then(response => {
                this.setTutorials(response.data);
                console.log(response.data)
            })
            .catch(e => { console.log(e) });
        },
    },
}
</script>