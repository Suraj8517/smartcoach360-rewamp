import { Fragment } from 'react';

export default function Words({ text, cls = 'mt-3' }) {
  const words = text.split(' ');
  return words.map((word, i) => (
    <Fragment key={i}>
      <span data-word className={`inline-block will-change-transform ${cls}`}>
        {word}
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}