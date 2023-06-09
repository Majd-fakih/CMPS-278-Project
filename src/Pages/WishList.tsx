import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ItemType } from "../data/Interfaces/WishList";
import { Item, HorizontalScroll } from "./Apps";
import { getWishListAsync } from "../features/wishListSlice";
import { Application } from "../data/Interfaces/Applications";
import { Game } from "../data/Interfaces/Games";
import Movie from "../data/Interfaces/Movies";
import { MovieItem } from "./Movies";
import { BooksData } from "../data/Interfaces/Books";
import BookCover from "../Components/BookComponents/BookCover";
import { Link } from "react-router-dom";
import RouteTo from "../data/Routes";

const WishListHelper = () => {
	const { wishList, isLoading } = useAppSelector((state) => state.WishList);
	const { applications } = useAppSelector((state) => state.Applications);
	const { games } = useAppSelector((state) => state.Games);
	const { movies } = useAppSelector((state) => state.Movies);
	const { books } = useAppSelector((state) => state.Books);

	const appsAndGames = [
		...wishList.items
			.filter((item) => item.itemType === ItemType.Application || item.itemType === ItemType.Game)
			.map((item) => {
				return {
					itemType: item.itemType,
					item: (item.itemType === ItemType.Application
						? applications.find((app) => app.appId === item.itemId)
						: games.find((game) => game.appId === item.itemId)) as Game | Application,
				};
			}),
	];

	const movieList = [
		...wishList.items
			.filter((item) => item.itemType === ItemType.Movie)
			.map((item) => {
				return {
					itemType: item.itemType,
					item: movies.find((movie) => movie.id === parseInt(item.itemId)) as Movie,
				};
			}),
	];

	const booksList = [
		...wishList.items
			.filter((item) => item.itemType === ItemType.Book)
			.map((item) => {
				return {
					itemType: item.itemType,
					item: books.find((book) => book.id === item.itemId) as BooksData,
				};
			}),
	]

	return (
		<div className="relative top-16 font-Roboto">
			<h1 className="text-2xl mb-5">Wishlist</h1>

			<div className="flex flex-col">
				{appsAndGames.length > 0 && (
					<>
						<h2 className="text-lg text-[#595a5c] font-google">Apps & Games</h2>
						<HorizontalScroll>
							{appsAndGames.map((item) => (
								<Item key={item.item.appId} item={item.item} itemType={item.itemType} />
							))}
						</HorizontalScroll>
					</>)
				}

				{movieList.length > 0 && (
					<>

						<h2 className="text-lg text-[#595a5c] font-google">Movies</h2>
						<HorizontalScroll>
							{movieList.map((movie) => (
								<MovieItem curr={1} key={movie.item.id} movieItem={movie.item} />
							))}
						</HorizontalScroll>
					</>
				)}

				{booksList.length > 0 && (
					<>
						<h2 className="text-lg text-[#595a5c] font-google">Books</h2>
						<HorizontalScroll>
							{booksList.map((book) => (
								<div key={book.item.id} className='inline-block'>
									<Link to={RouteTo.BookPageDetails(book.item.id)}>
										<div className='w-44 h-80 m-1 hover:bg-[#E4E4E4] cursor-pointer relative active:bg-[#DCDCDC]'>
											<div className='absolute left-0 right-0' >
												<div className='mx-auto flex justify-center'>
													<img src={book.item.image ? book.item.image : "https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg"} alt="" />
												</div>
												<div className='mx-auto flex ml-1 mt-2'>
													<p className='font-light text-sm'>{book.item.title}</p>
												</div>
											</div>
										</div>
									</Link>
								</div>
							))}
						</HorizontalScroll>
					</>
				)}

				{appsAndGames.length == 0 && movieList.length == 0 && booksList.length == 0 && (
					<div className="relative top-16 font-Roboto text-center">
						<p className="text-lg">Your wishlist is empty</p>
					</div>
				)}
			</div>
		</div>
	);
};

const WishList = () => {
	const { wishList, isLoading } = useAppSelector((state) => state.WishList);
	const { isSignedIn } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	async function getWishlist() {
		await dispatch(getWishListAsync());
	}

	useEffect(() => {
		if (Object.keys(wishList).length === 0) {
			getWishlist();
		}
	}, []);

	return (
		<>
			{!isSignedIn ? (
				<div className="relative top-16 font-Roboto text-center">
					<p className="text-lg">Please sign in to view your Wishlist</p>
				</div>
			) : (
				<>
					{isLoading ? (
						<div className="relative top-16 font-Roboto text-center">
							<p className="text-lg">Loading...</p>
						</div>
					) : (
						<WishListHelper />
					)}
				</>
			)}
		</>
	);
};

export default WishList;
