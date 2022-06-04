import React, { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { Label } from ".";

const AutocompleteItem = ({ _id, description, onClick }) => (
  <>
    <li
      className="hover:bg-neutral-200 flex gap-4 p-2 cursor-pointer"
      onClick={onClick}
    >
      {description}
    </li>
  </>
);

const AutocompleteComponent = ({ placeholder, title, sources, onSelected }) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
    query: "",
  });

  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder,
        onStateChange: ({ state }) => setAutocompleteState(state),
        onReset: () =>
          setAutocompleteState({ ...autocompleteState, query: "" }),
        getSources: () =>
          sources.map((source) => {
            return {
              sourceId: source.id,
              getItems: async ({ query }) => {
                if (!!query) {
                  return await source.fnSource(query);
                }
              },
            };
          }),
      }),
    []
  );

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  const handleSelected = ({ _id, description }) => {
    autocomplete.setIsOpen(false);
    autocomplete.setQuery(description);
  };

  const handleBlur = () => {
    autocomplete.setIsOpen(false);

    if (autocompleteState.query === "") {
      onSelected(null);
      return;
    }

    const collections = autocompleteState.collections[0].items.find(
      (item) =>
        `${item.description}`.toLowerCase() ===
        `${autocompleteState.query}`.toLowerCase()
    );

    if (collections) {
      onSelected(collections);
      return;
    }

    onSelected({
      _id: `new-${Math.ceil(Math.random() * 100000)}`,
      description: `${autocompleteState.query}`.toUpperCase(),
    });
  };

  return (
    <>
      <div>
        <Label text={title} />
        <input
          ref={inputRef}
          type="text"
          className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
          {...inputProps}
          onBlur={handleBlur}
        />
        {autocompleteState.isOpen && (
          <div
            className="absolute bg-white rounded-lg shadow-lg p-2 border-2 overflow-hidden z-10"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((item, index) => {
              const { items } = item;
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem
                          key={item._id}
                          {...item}
                          onClick={() => handleSelected(item)}
                        />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AutocompleteComponent;
