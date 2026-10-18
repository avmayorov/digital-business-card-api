import { Kind, type GraphQLResolveInfo, type SelectionSetNode } from 'graphql';

export function isFieldSelected(
  info: GraphQLResolveInfo,
  field: string,
): boolean {
  function checkSelection(selectionSet: SelectionSetNode | undefined): boolean {
    return !!selectionSet?.selections.some((selection) => {
      if (selection.kind === Kind.FIELD) {
        return selection.name.value === field;
      }
      if (selection.kind === Kind.INLINE_FRAGMENT) {
        return checkSelection(selection.selectionSet);
      }
      if (selection.kind === Kind.FRAGMENT_SPREAD) {
        return checkSelection(
          info.fragments[selection.name.value]?.selectionSet,
        );
      }
      return false;
    });
  }

  return info.fieldNodes.some((node) => checkSelection(node.selectionSet));
}
