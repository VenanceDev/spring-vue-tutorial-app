<template>
    <div>
        <h4 class="text-left pt-5 pb-3">Tutorials</h4>
        <div class="col-md-4">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title"
                    v-model="searchTerm"
                />
                <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                    @click="filterByTitle"
                >
                    Search
                </button>
                </div>
            </div>
        </div>
        <TutorialList />
    </div>
</template>

<script>
import TutorialList from '@/components/TutorialList.vue'
import TutorialDataService from '../services/TutorialDataService'
import { mapActions } from 'vuex'

export default {
    name: 'Tutorials',
    data() {
        return {
            searchTerm: ''
        }
    },
    components: {
        TutorialList
    },
    methods: {
        ...mapActions(['setTutorials', 'setCurrentTutorial']),
        filterByTitle() {
            TutorialDataService.findByTitle(this.searchTerm)
                .then(response => {
                    console.log(response.data)
                    this.setTutorials(response.data)
                    this.setCurrentTutorial({ newCurTuto:null, newCurIndex:-1 })
                });
        },

    }
}
</script>