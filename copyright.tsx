import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'copyright',
  setup() {
    const currentYear = ref(new Date().getFullYear())
    const company = 'company' //

    return () => (
      <div class="text-center py-2 text-sm h-full">
        &copy;
        {' '}
        {currentYear.value}
        {' '}
        Powered by&nbsp;
        <a href="https://github.com/Jaynxe" target="_blank" class="font-bold text-sky-500 hover:text-blue-700">
          {company}
        </a>
        {' '}
        . All rights reserved.
      </div>
    )
  },
})
