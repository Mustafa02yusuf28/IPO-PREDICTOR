import os
import pandas as pd

# Paths
raw_data_folder = "data/raw"
processed_data_folder = "data/processed"
output_file = os.path.join(processed_data_folder, "ipo_cleaned_data.csv")

# Required columns mapping
required_columns = {
    "Company Name": "company",
    "Listing Date": "listing_date",
    "Issue Price (Rs)": "issue_price",
    "Listing Day - Close Price (Rs)": "listing_price"
}

def load_and_clean_data():
    csv_files = [file for file in os.listdir(raw_data_folder) if file.endswith(".csv")]
    combined_data = []

    print(f"Found {len(csv_files)} CSV files.")

    for file_name in csv_files:
        file_path = os.path.join(raw_data_folder, file_name)
        try:
            data = pd.read_csv(file_path)
            print(f"Reading {file_name} with shape: {data.shape}")

            data = data.rename(columns=lambda x: x.strip())
            if all(col in data.columns for col in required_columns.keys()):
                data = data[required_columns.keys()]
                data = data.rename(columns=required_columns)
                combined_data.append(data)
            else:
                print(f"Skipped {file_name} due to missing columns")
        except Exception as e:
            print(f"Error reading {file_name}: {e}")

    if combined_data:
        final_data = pd.concat(combined_data, ignore_index=True)
        final_data.dropna(inplace=True)
        final_data["listing_gain_pct"] = ((final_data["listing_price"] - final_data["issue_price"]) / final_data["issue_price"]) * 100
        final_data.to_csv(output_file, index=False)
        print(f"Saved merged file to {output_file} with shape: {final_data.shape}")
    else:
        print("No valid data found.")

if __name__ == "__main__":
    load_and_clean_data()
