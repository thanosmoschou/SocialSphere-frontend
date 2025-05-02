import ProfilePicture from '../../assets/profile-picture.png';
import { User } from '../../types/types';

export const Photos = ({ user }: { user: User }) => {
   return (
      <div className="space-y-6">
         {/* Photo Controls */}
         <div className="flex justify-between items-center">
            <div className="flex gap-4">
               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Photos</option>
                  <option value="profile">Profile Pictures</option>
                  <option value="cover">Cover Photos</option>
                  <option value="posts">Post Photos</option>
               </select>
               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Liked</option>
               </select>
            </div>
         </div>

         {/* Photo Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Photo Card 1 */}
            <div className="group relative aspect-square rounded-lg overflow-hidden">
               <img
                  src={ProfilePicture}
                  alt="Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex items-center justify-between">
                        <span className="text-sm">2 days ago</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm">❤️ 24</span>
                           <span className="text-sm">💬 8</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Photo Card 2 */}
            <div className="group relative aspect-square rounded-lg overflow-hidden">
               <img
                  src={ProfilePicture}
                  alt="Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex items-center justify-between">
                        <span className="text-sm">1 week ago</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm">❤️ 42</span>
                           <span className="text-sm">💬 12</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Photo Card 3 */}
            <div className="group relative aspect-square rounded-lg overflow-hidden">
               <img
                  src={ProfilePicture}
                  alt="Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex items-center justify-between">
                        <span className="text-sm">2 weeks ago</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm">❤️ 18</span>
                           <span className="text-sm">💬 5</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Photo Card 4 */}
            <div className="group relative aspect-square rounded-lg overflow-hidden">
               <img
                  src={ProfilePicture}
                  alt="Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex items-center justify-between">
                        <span className="text-sm">1 month ago</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm">❤️ 56</span>
                           <span className="text-sm">💬 15</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Photo Card 5 */}
            <div className="group relative aspect-square rounded-lg overflow-hidden">
               <img
                  src={ProfilePicture}
                  alt="Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex items-center justify-between">
                        <span className="text-sm">2 months ago</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm">❤️ 31</span>
                           <span className="text-sm">💬 9</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Photo Card 6 */}
            <div className="group relative aspect-square rounded-lg overflow-hidden">
               <img
                  src={ProfilePicture}
                  alt="Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex items-center justify-between">
                        <span className="text-sm">3 months ago</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm">❤️ 45</span>
                           <span className="text-sm">💬 11</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
