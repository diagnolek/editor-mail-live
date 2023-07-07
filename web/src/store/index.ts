import Vue from 'vue';
import Vuex from 'vuex';
import Editor from "../models/Editor";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        editor: {
            recipients: [],
            text: '',
        } as Editor
    },
    mutations: {
        SET_EDITOR(state, payload: Editor) {
            state.editor = payload;
        },
        SET_EDITOR_TEXT(state, payload: string) {
            state.editor.text = payload;
        },
        SET_EDITOR_RECIPIENTS(state, payload: string[]) {
            state.editor.recipients = payload;
        }
    },
    actions: {
        editorFetch({commit}) {
            const savedData = localStorage.getItem('app-mail-live-editor');
            if (savedData) {
                const data: Editor = JSON.parse(savedData);
                commit('SET_EDITOR', data);
            }
        },
        editorPersist({state}) {
            localStorage.setItem('app-mail-live-editor',JSON.stringify(state.editor))
        },
        editorClear({commit}): void {
            commit('SET_EDITOR',{
                recipients: [],
                text: ''
            });
            localStorage.removeItem('app-mail-live-editor')
        }
    },
    getters: {
        getEditorText(state) {
            return (): string => {
                return state.editor.text;
            }
        },
        getEditorRecipients(state) {
            return (): string[] => {
                return state.editor.recipients;
            }
        }
    }
});

export default store;
