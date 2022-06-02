import React, { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { Label } from ".";
import { findByDescription } from "../services/commerce.api";

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

const AutocompleteComponent = ({
  placeholder,
  title,
  sourceId,
  source,
  onSelected,
  onAutoSave,
}) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
    query: "",
  });
  const [inputValue, setInputValue] = useState({});

  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder,
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId,
            getItems: async ({ query }) => {
              if (!!query) {
                return await source(query);
              }
            },
          },
        ],
      }),
    []
  );

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  const handleSelected = ({ _id, description }) => {
    setInputValue({ _id, description });
    autocomplete.setIsOpen(false);
    autocomplete.setQuery(description);
  };

  const handleBlur = () => {
    autocomplete.setIsOpen(false);

    if (autocompleteState.query === "") {
      setInputValue({});
      onSelected(null);
      return;
    }

    const collections = autocompleteState.collections[0].items.find(
      (item) => item.description === autocompleteState.query
    );

    if (collections) {
      onSelected(inputValue);
      return;
    }

    onAutoSave(autocompleteState.query);
  };

  return (
    <>
      <div className="mb-1">
        <Label text={title} />
        <input
          ref={inputRef}
          type="text"
          className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
          {...inputProps}
          onBlur={handleBlur}
        />
      </div>
      <div>
        {autocompleteState.isOpen && (
          <div
            className="absolute bg-white rounded-lg shadow-lg p-2 border-2 overflow-hidden"
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
