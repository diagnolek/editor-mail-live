import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Editor from '../src/components/Mail/Editor.vue'
import store from "../src/store";

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditorComponentTest', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(Editor, {store});
        wrapper.setData({
            content: '',
            active: {
                bold: false,
                italic: false,
                underline: false
            }
        });
    });

    test('input text in editor', async () => {
        const editor = wrapper.find('.editor');
        editor.element.innerHTML = 'test';
        await editor.trigger('input');
        expect(wrapper.vm.$data.content).toContain('test');
    })

    test('active button in editor', async () => {
        const button = wrapper.find('#editor-btn-bold');
        await button.trigger('click');
        expect(wrapper.vm.$data.active.bold).toBe(true);
    })

})
