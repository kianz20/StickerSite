import { Button, MenuItem, TextField } from "@mui/material";
import styles from "../styles/SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { productDetails } from "../models";
import * as api from "../apiControllers/productController";
import SingleSearchResult from "./SingleSearchResult";

const SearchBar: React.FC<{}> = () => {
    const [category, setCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("all");

    const [productDetails, setProductDetails] = useState<productDetails[]>();

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setCategory(value);
    };

    const getProductData = async () => {
        try {
            const data = await api.getProducts();
            if (data.error) {
                console.error("Fetch products failed: ", data.error);
            } else {
                setProductDetails(data.products);
                console.log("Products fetched successfully: ", data.products);
            }
        } catch (error) {
            console.error("Error retreiving products:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <div>
            <div className={styles.searchBanner}>
                <div className={styles.searchBarContainer}>
                    <TextField
                        variant="filled"
                        select
                        id="categoryPicker"
                        className={styles.categorySelect}
                        value={category}
                        onChange={handleCategoryChange}
                        hiddenLabel
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="sticker">Stickers</MenuItem>
                        <MenuItem value="frames">Frames</MenuItem>
                        <MenuItem value="pinsBadges">Pins and Badges</MenuItem>
                    </TextField>

                    <TextField
                        className={styles.searchEntry}
                        variant="filled"
                        placeholder="Search"
                        onChange={(event) => setSearchQuery(event.target.value)}
                        hiddenLabel
                    ></TextField>
                </div>
            </div>

            <div className={styles.empty}>
                <div className={styles.searchResultsContainer}>
                    {searchQuery &&
                        productDetails
                            ?.filter((product) =>
                                product.name.includes(searchQuery)
                            )
                            ?.slice(0, 8)
                            .map((product) => (
                                <SingleSearchResult
                                    key={product._id}
                                    {...product}
                                />
                            ))}
                    <div className={styles.seeAllButton}>
                        <Button
                            className={styles.buttonText}
                            onClick={() => {
                                alert("functionality does not exist yet");
                            }}
                            aria-label="View All Search
                            Results"
                        >
                            View All Results &emsp;&emsp;
                            <SearchIcon
                                fontSize="large"
                                sx={{ color: "black" }}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
