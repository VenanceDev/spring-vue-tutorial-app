<template>
  <div>
      <div class="submit-form">
        <h4 class="pt-5 pb-3 text-left">New Tutorial</h4>
        <AddTutorialForm />
    </div>
  </div>
</template>


<script>
import AddTutorialForm from '@/components/AddTutorialForm'
export default {
    name: 'AddTutorial',
    components: {
        AddTutorialForm
    }
}
</script>