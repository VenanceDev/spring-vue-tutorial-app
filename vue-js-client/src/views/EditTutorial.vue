<template>
    <div>
    <h4 class="pt-5 pb-3 text-left">Edit Tutorial</h4>
    <div v-if="currentTutorial">
        <EditTutorialForm />
    </div>
    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'
import EditTutorialForm from '../components/EditTutorialForm'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'EditTutorial',
    data() {
        return {
            
        }
    },
    components: {
        EditTutorialForm
    },
    computed: {
        ...mapState(['currentTutorial']),
    },
    methods: {
        ...mapActions(['setCurrentTutorial']),
        getTutorial(id){
            TutorialDataService.get(id)
                .then(response => {
                    this.setCurrentTutorial({ newCurTuto: response.data, newCurIndex: id })
                    console.log(this.currentTutorial)
                })
                .catch(e => console.log(e));
        },
    },
    mounted(){ 
        this.getTutorial(this.$route.params.id);
    },
    
}
</script>