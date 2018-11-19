<template>
    <v-container grid-list-md>
        <v-layout wrap> 
            <v-flex xs12 sm6 md4 v-for="header in headers" 
                :key="header.value" v-if="header.canEdit && header.type!='textarea'">
                <v-select v-if="header.type==='select'"
                    no-data-text='没有数据'
                    v-model="editedItem[header.value]" 
                    :items="header.options" 
                    v-validate="header.validate"
                    :data-vv-name="header.text"
                    :error-messages="errors.collect(header.text)"
                    :label="header.text" :required="header.required">
                </v-select>
                <v-text-field v-else v-model="editedItem[header.value]" 
                    v-validate="header.validate"
                    :data-vv-name="header.text"
                    :counter="header.counter"
                    :error-messages="errors.collect(header.text)"
                    :label="header.text" :required="header.required">
                </v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12 v-else-if="header.canEdit && header.type==='textarea'">
                <v-textarea 
                    v-model="editedItem[header.value]"
                    v-validate="header.validate"
                    :data-vv-name="header.text"
                    :counter="header.counter"
                    :error-messages="errors.collect(header.text)"
                    :label="header.text" :required="header.required"></v-textarea>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  props: ["headers", "editedItem"]
};
</script>

