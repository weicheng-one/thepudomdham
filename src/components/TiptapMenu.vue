<script setup lang="ts">
import TiptapMenuButton from './TiptapMenuButton.vue';
import TiptapMenuDivider from './TiptapMenuDivider.vue';
defineEmits([
  'toggleBold',
  'toggleItalic',
  'toggleStrike',
  'toggleCode',
  'toggleHighlight',
  'toggleHeadingLevel1',
  'toggleHeadingLevel2',
  'setParagraph',
  'toggleBulletList',
  'toggleOrderedList',
  'toggleTaskList',
  'toggleCodeBlock',
  'toggleBlockQuote',
  'setHorizontalRule',
  'setHardBreak',
  'clearFormat',
  'setImage',
  'setLink'
]);
</script>
<template>
  <TiptapMenuButton @click="$emit('toggleBold')" title="Bold">
    <i class="ri-bold text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleItalic')" title="Italic">
    <i class="ri-italic text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleStrike')" title="Strike">
    <i class="ri-strikethrough text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleCode')" title="Code">
    <i class="ri-code-view text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleHighlight')" title="Highlight">
    <i class="ri-mark-pen-line text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuDivider />
  <TiptapMenuButton @click="$emit('toggleHeadingLevel1')" title="Heading 1">
    <i class="ri-h-1 text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleHeadingLevel2')" title="Heading 2">
    <i class="ri-h-2 text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('setParagraph')" title="Paragraph">
    <i class="ri-paragraph text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleBulletList')" title="Bullet List">
    <i class="ri-list-unordered text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleOrderedList')" title="Ordered List">
    <i class="ri-list-ordered text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleTaskList')" title="Task List">
    <i class="ri-list-check-2 text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('toggleCodeBlock')" title="Code Block">
    <i class="ri-code-box-line text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuDivider />
  <TiptapMenuButton @click="$emit('toggleBlockQuote')" title="Blockquote">
    <i class="ri-double-quotes-l text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('setHorizontalRule')" title="Horizontal Rule">
    <i class="ri-separator text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuDivider />
  <TiptapMenuButton @click="$emit('setHardBreak')" title="Hard Break">
    <i class="ri-text-wrap text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('clearFormat')" title="Clear Format">
    <i class="ri-format-clear text-xl"></i>
  </TiptapMenuButton>

  <TiptapMenuDivider />
  <TiptapMenuButton @click="$emit('setImage')" title="Image">
    <i class="ri-image-fill text-xl"></i>
  </TiptapMenuButton>
  <TiptapMenuButton @click="$emit('setLink')" title="Link">
    <i class="ri-link text-xl"></i>
  </TiptapMenuButton>
</template>
