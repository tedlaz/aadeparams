import os
import pathlib

current_file_path = pathlib.Path(__file__).parent.absolute()


def create_aade_data(directory=current_file_path / "aade_text") -> dict:
    """
    List all text files in the given directory and parse their content.
    """
    res = {}
    try:
        for file in os.listdir(directory):
            if not file.endswith(".txt"):
                continue
            dname = file[:-4]

            with open(os.path.join(directory, file), "r", encoding="utf-8") as f:
                title = f.readline().strip()
                titlep = f.readline().strip()
                colnames = f.readline().strip().split()
                columns = len(colnames)

                res[dname] = {"title": title, "titlep": titlep, "vals": []}
                for line in f:
                    stripped_line = line.strip()

                    if stripped_line.startswith("#") or len(stripped_line) < 3:
                        continue

                    llist = stripped_line.split()
                    fixline = llist[: columns - 1] + [" ".join(llist[columns - 1 :])]
                    res[dname]["vals"].append(dict(zip(colnames, fixline)))

    except Exception as e:
        print(f"Error processing directory {directory}: {e}")
    return res


if __name__ == "__main__":
    data = create_aade_data()
    print(data["countries"])
