import { VNode, h, text } from 'hyperapp';

// Ref. (In Japanese) https://qiita.com/kerupani129/items/99fd7a768538fcd33420
export function wrapView<S>(originalView: (state: S) => VNode<S>, fromJson: (text: string) => S = JSON.parse): (state: S) => VNode<S> {
  return (state) => {
    // Build JSON only when clicking <a>
    const SaveSnapshot = (st: S) => {
      const jsonUri = encodeURIComponent(
        JSON.stringify(state, undefined, 2)
      );

      const a = document.createElement('a');
      a.href = `data:application/json;charset=utf-8,${jsonUri}`;
      a.download = "snapshot.json";

      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return st;
    };

    const LoadSnapshot = (dispatch: (st: S) => void) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept =".json,application/json";
      fileInput.onchange = () => {
        const reader = new FileReader();
        reader.readAsText(fileInput.files![0]);
        reader.onload = () => {
          dispatch(fromJson(reader.result as string));
        };
      };
      fileInput.click();
    };

    const StartLoadingSnapshot = (st: S): [S, [typeof LoadSnapshot, undefined]] => {
      return [
        st,
        [LoadSnapshot, undefined]
      ];
    };

    return h("div", {}, [
      h("a",
        {
          onclick: SaveSnapshot,
          href: "javascript:void(0)",
        },
        text("Save Snapshot"),
      ),
      text(" "),
      h("a",
        {
          onclick: StartLoadingSnapshot,
          href: "javascript:void(0)",
        },
        text("Load Snapshot"),
      ),
      originalView(state),
    ])
  };
}
