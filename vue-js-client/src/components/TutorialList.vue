<template>
  <div class="list row">
    <div class="col-md-6">
      <ul class="list-group">
        <li v-if="tutorials.length <= 0" class="font-italic text-muted">No tutorial found !</li>
        <li v-else class="list-group-item tuto-li"
          v-for="(tutorial, index) in tutorials" :key="index"
          @click="setCurrentTutorial({newCurTuto: tutorial, newCurIndex:index+1})"
          :class="{ active: currentIndex == index+1}"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button v-if="tutorials.length > 0" class="m-3 btn btn-sm btn-danger"
          @click="removeAllTutorials"
        >
        Remove All
      </button>
    </div>
    <div v-if="currentTutorial" class="col-md-6">
      <div>
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/edit-tutorial/' + currentTutorial.id"
        >
          Edit
        </a>
      </div>
      <div>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'
import {mapActions, mapState} from 'vuex'

export default {
    name: 'tutorial-list',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['tutorials', 'currentTutorial', 'currentIndex']),
    }
    ,
    methods: {
        ...mapActions(['setCurrentTutorial', 'setTutorials']),
        fetchTutorials() {
            TutorialDataService.getAll()
            .then(response => {
                this.setTutorials(response.data);
                console.log(response.data)
            })
            .catch(e => { console.log(e) });
        },
        /* setActiveTutorial(tutorial, index) {
            this.setCurrentTutorial(tutorial, index)
        }, */
        refreshList() {
            this.fetchTutorials();
            this.setCurrentTutorial({newCurTuto:null, newCurIndex:-1})
        },
        removeAllTutorials() {
            TutorialDataService.deleteAll()
                .then(response => {
                    console.log(response)
                    this.refreshList()
                })
                .catch(e => { console.log(e) });
        },
    },
    mounted() {
        this.fetchTutorials();
    },
}
</script>

<style lang="css">
    .tuto-li {
        cursor: pointer;
    }

    /* .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    } */
</style>